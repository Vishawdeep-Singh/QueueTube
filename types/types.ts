interface PageInfo {
  totalResults: number;
  resultPerPage: number;
}

interface ThumbnailDimensions {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default: ThumbnailDimensions;
  medium: ThumbnailDimensions;
  high: ThumbnailDimensions;
  standard?: ThumbnailDimensions;
  maxres?: ThumbnailDimensions;
}

interface Localized {
  title: string;
  description: string;
}

interface SnippetBase {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
}

export interface PlaylistSnippet extends SnippetBase {
  localized: Localized;
}

interface VideoResourceId {
  kind: 'youtube#video';
  videoId: string;
}

interface VideoSnippet extends SnippetBase {
  playlistId: string;
  position: number;
  resourceId: VideoResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

interface ContentDetailsBase {
  itemCount?: number; // Optional for videos
}

export interface PlaylistContentDetails extends ContentDetailsBase {
  itemCount: number;
}

interface VideoContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

export type Playlist = {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: PlaylistItem[];
};

export interface PlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: PlaylistSnippet;
  contentDetails: PlaylistContentDetails;
}

export type Video = {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoItem[];
};

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  videoDuration: string;
  viewCount: number;
  snippet: VideoSnippet;
  contentDetails: VideoContentDetails;
}

export type WatchVideo = {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: WatchVideoItem[];
};

interface WatchVideoItem {
  kind: 'youtube#video';
  etag: string;
  id: string;
  snippet: WatchVideoSnippet;
  contentDetails: WatchVideoContentDetails;
  statistics: WatchVideoStatistics;
}

interface WatchVideoSnippet extends SnippetBase {
  categoryId: string;
  liveBroadcastContent: string;
  localized: WatchVideoLocalized;
}

interface WatchVideoLocalized {
  title: string;
  description: string;
}

interface WatchVideoContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: Record<string, unknown>;
  projection: string;
}

interface WatchVideoStatistics {
  viewCount: number;
  likeCount: number;
  favoriteCount: string;
  commentCount: number;
}
