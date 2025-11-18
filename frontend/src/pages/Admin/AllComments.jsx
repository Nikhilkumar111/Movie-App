import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  // Check if there are no reviews in any movie
  const noReviews = movie?.every((m) => m.reviews.length === 0);

  return (
    <div className="h-300 w-200">
      {noReviews ? (
        <div className="text-center text-black mt-10 text-xl">
          No reviews found
        </div>
      ) : (
        movie?.map((m) => (
          <section
            key={m._id}
            className="flex flex-col justify-center items-center"
          >
            {m?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#6878f08b] p-4 rounded-lg w-[50%] mt-[2rem]"
              >
                <div className="flex justify-between">
                  <strong className="text-[#ffffff]">{review.name}</strong>
                  <p className="text-[#e86b6b]">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>

                <p className="my-4 text-blue-800">{review.comment}</p>

                <button
                  className="text-red-500"
                  onClick={() => handleDeleteComment(m._id, review._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
};

export default AllComments;
