export interface GetPostComment {
    commenterUserId: string;
    commenterImageUrl: string;
    commenterFirstName: string;
    commenterLastName: string;
    comment: string;
    commentCreatedDate: string;
    taggedUsers: string[] | null; // Eğer kullanıcı tag'leri varsa bir dizi olacak
    replies: GetPostComment[] | null; // Yanıtlar için aynı yapıyı kullanıyoruz
  }
  
  export interface GetPostCommentResponse {
    commentId: number;
    parentCommentId: number | null;
    commenters: GetPostComment[];
  }
  