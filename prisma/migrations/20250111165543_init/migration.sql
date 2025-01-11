-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AuthToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" BYTEA NOT NULL,
    "refreshToken" BYTEA,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "contentDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistSnippet" (
    "id" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnails" JSONB NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "localizedId" TEXT NOT NULL,

    CONSTRAINT "PlaylistSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localized" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Localized_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistContentDetails" (
    "id" TEXT NOT NULL,
    "itemCount" INTEGER NOT NULL,

    CONSTRAINT "PlaylistContentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "videoDuration" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "snippetId" TEXT NOT NULL,
    "contentDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoSnippet" (
    "id" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnails" JSONB NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "resourceId" JSONB NOT NULL,
    "videoOwnerChannelTitle" TEXT NOT NULL,
    "videoOwnerChannelId" TEXT NOT NULL,

    CONSTRAINT "VideoSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoContentDetails" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "videoPublishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoContentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchVideo" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "contentDetailsId" TEXT NOT NULL,
    "statisticsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchVideoSnippet" (
    "id" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnails" JSONB NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "liveBroadcastContent" TEXT NOT NULL,
    "localizedId" TEXT NOT NULL,

    CONSTRAINT "WatchVideoSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchVideoContentDetails" (
    "id" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "licensedContent" BOOLEAN NOT NULL,
    "contentRating" JSONB NOT NULL,
    "projection" TEXT NOT NULL,

    CONSTRAINT "WatchVideoContentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchVideoStatistics" (
    "id" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "favoriteCount" TEXT NOT NULL,
    "commentCount" INTEGER NOT NULL,

    CONSTRAINT "WatchVideoStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_userId_key" ON "AuthToken"("userId");

-- CreateIndex
CREATE INDEX "AuthToken_userId_idx" ON "AuthToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_snippetId_key" ON "Playlist"("snippetId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_contentDetailsId_key" ON "Playlist"("contentDetailsId");

-- CreateIndex
CREATE INDEX "Playlist_userId_idx" ON "Playlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistSnippet_localizedId_key" ON "PlaylistSnippet"("localizedId");

-- CreateIndex
CREATE INDEX "PlaylistSnippet_channelId_idx" ON "PlaylistSnippet"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_snippetId_key" ON "Video"("snippetId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_contentDetailsId_key" ON "Video"("contentDetailsId");

-- CreateIndex
CREATE INDEX "Video_playlistId_idx" ON "Video"("playlistId");

-- CreateIndex
CREATE INDEX "VideoSnippet_channelId_idx" ON "VideoSnippet"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchVideo_snippetId_key" ON "WatchVideo"("snippetId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchVideo_contentDetailsId_key" ON "WatchVideo"("contentDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchVideo_statisticsId_key" ON "WatchVideo"("statisticsId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchVideoSnippet_localizedId_key" ON "WatchVideoSnippet"("localizedId");

-- CreateIndex
CREATE INDEX "WatchVideoSnippet_channelId_idx" ON "WatchVideoSnippet"("channelId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "PlaylistSnippet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_contentDetailsId_fkey" FOREIGN KEY ("contentDetailsId") REFERENCES "PlaylistContentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSnippet" ADD CONSTRAINT "PlaylistSnippet_localizedId_fkey" FOREIGN KEY ("localizedId") REFERENCES "Localized"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "VideoSnippet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_contentDetailsId_fkey" FOREIGN KEY ("contentDetailsId") REFERENCES "VideoContentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchVideo" ADD CONSTRAINT "WatchVideo_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "WatchVideoSnippet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchVideo" ADD CONSTRAINT "WatchVideo_contentDetailsId_fkey" FOREIGN KEY ("contentDetailsId") REFERENCES "WatchVideoContentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchVideo" ADD CONSTRAINT "WatchVideo_statisticsId_fkey" FOREIGN KEY ("statisticsId") REFERENCES "WatchVideoStatistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchVideoSnippet" ADD CONSTRAINT "WatchVideoSnippet_localizedId_fkey" FOREIGN KEY ("localizedId") REFERENCES "Localized"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
