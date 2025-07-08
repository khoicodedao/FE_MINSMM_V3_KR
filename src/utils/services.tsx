import { SERVICE_TYPE } from "constants/services";

const ConvertStringToTypeService = (type: string) => {
  switch (type) {
    case SERVICE_TYPE.default_label:
      return SERVICE_TYPE.default_value;
    case SERVICE_TYPE.custom_comments_label:
      return SERVICE_TYPE.custom_comments_value;
    case SERVICE_TYPE.package_label:
      return SERVICE_TYPE.package_value;
    case SERVICE_TYPE.invite_from_group_label:
      return SERVICE_TYPE.invite_from_group_value;
    case SERVICE_TYPE.subcription_reselling_label:
      return SERVICE_TYPE.subcription_reselling_value;
    case SERVICE_TYPE.custom_comments_package_label:
      return SERVICE_TYPE.custom_comments_package_value;
    case SERVICE_TYPE.mention_custom_list_label:
      return SERVICE_TYPE.mention_custom_list_value;
    case SERVICE_TYPE.poll_label:
      return SERVICE_TYPE.poll_value;
    case SERVICE_TYPE.mentions_with_hashtags_label:
      return SERVICE_TYPE.mentions_with_hashtags_value;
    case SERVICE_TYPE.mentions_user_followers_label:
      return SERVICE_TYPE.mentions_user_followers_value;
    case SERVICE_TYPE.comment_likes_label:
      return SERVICE_TYPE.comment_likes_value;
    case SERVICE_TYPE.mentions_hashtag_label:
      return SERVICE_TYPE.mentions_hashtag_value;
    case SERVICE_TYPE.mentions_media_likers_label:
      return SERVICE_TYPE.mentions_media_likers_value;
    default:
      return "";
  }
};

export { ConvertStringToTypeService };
