/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { FileService, FileType } from "src/file/file.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CrateTrackDto } from "./dto/create-track.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Track, TrackDocument } from "./schemas/track.schema";

@Injectable({})
export class TrackService {

  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService
  ) { }

  async create(dto: CrateTrackDto, picture, audio): Promise<Track> {
    const
      audioPath = this.fileService.createFile(FileType.AUDIO, audio),
      picturePath = this.fileService.createFile(FileType.IMAGE, picture),
      track = await this.trackModel.create({ ...dto, listens: 0, audio: audioPath, picture: picturePath });

    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));

    return tracks;
  }

  async search(query): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: {$regex: new RegExp(query, 'i')}
    });

    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await (await this.trackModel.findById(id)).populate('comments');

    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);

    return track._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const
      track = await this.trackModel.findById(dto.trackId),
      comment = await this.commentModel.create({ ...dto });

    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    ++track.listens;
    track.save();
  }
};