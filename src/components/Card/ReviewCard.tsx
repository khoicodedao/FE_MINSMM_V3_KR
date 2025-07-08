type ReviewCardProps = {
  content: string;
  author: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ content, author }) => {
  return (
    <div className="w-full rounded-2xl bg-white p-4 text-start shadow-md sm:p-6">
      <p className="mb-4 text-gray-700">{content}</p>
      <p className="font-semibold">{author}</p>
    </div>
  );
};

export default ReviewCard;
