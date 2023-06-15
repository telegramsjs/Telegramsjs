type ChatActionType = {
	Typing: string;
	UploadPhoto: string;
	RecordVideo: string;
	UploadVideo: string;
	RecordVoice: string;
	UploadVoice: string;
	UploadDocument: string;
	ChooseSticker: string;
	FindLocation: string;
	RecordVideoNote: string;
	UploadVideoNote: string;
};

export const ChatActionType: ChatActionType = {
	Typing: "typing",
	UploadPhoto: "upload_photo",
	RecordVideo: "record_video",
	UploadVideo: "upload_video",
	RecordVoice: "record_voice",
	UploadVoice: "upload_voice",
	UploadDocument: "upload_document",
	ChooseSticker: "choose_sticker",
	FindLocation: "find_location",
	RecordVideoNote: "record_video_note",
	UploadVideoNote: "upload_video_note",
};
