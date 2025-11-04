import ReviewCard from "./ReviewCard";

const ReviewList = ({
  reviews,
  user,
  editReview,
  setEditReview,
  setEditingId,
  editingId,
  handleUpdateReview,
  handleDelete
}) => {
  return reviews.map((review) => (
    <ReviewCard
      key={review.id}
      review={review}
      user={user}
      editReview={editReview}
      setEditReview={setEditReview}
      isEditing={editingId === review.id }
      onEditClick={() => {
        setEditingId(review.id)
        setEditReview({
          ratings: review.ratings,
          comment: review.comment,
        });
      }}
      onCancelEdit={() => setEditingId(null)}
      onSaveEdit={handleUpdateReview}
      onDeleteClick={() => handleDelete(review.id)}
    />
  ));
};

export default ReviewList;
