
export interface Topic {
    id: number | string;
    title: string;
    description: string;
    videoURL: string;
    videoType: string;
    videoID: string;
}
export interface CourseModel {
    courseId :number | string;
    name : string;
    description: string;
    topics: Array<CTopic>;
}
export interface CTopic {
    topicId: number | string;
    name: string;
    videoURL: string;
    videoId: string;
    editor: any;
    projectUrl:string;
}