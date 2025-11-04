import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewSection = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("authTokens");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [editingId,setEditingId] = useState(null);
  const [editReview, setEditReview] = useState({ ratings: 0, comment: "" });
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/v1/articles/${id}/reviews/`);
      console.log(res.data);
      setReviews(res.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!token) {
      setMessage("You must be logged in to submit a review");
    }
    // console.log(data);
    try {
      const res = await authApiClient.post(
        `/api/v1/articles/${id}/reviews/`,
        data
      );
      setMessage("Review Submitted successfully!");
      fetchReviews();
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setMessage("You are not authorized. Please log in first.");
    }
  };


  const handleUpdateReview = async(reviewId) => {
    try {
      await authApiClient.put(`/api/v1/articles/${id}/reviews/${reviewId}/`,editReview);
      setEditingId(null);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  }
const handleDelete = async(reviewId) => {
  try {
    await authApiClient.delete(`/api/v1/articles/${id}/reviews/${reviewId}/`);
    fetchReviews();
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    fetchReviews();
  }, []);
  return (


    
    <div className="review-section">

<div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="badge badge-lg">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </div>
      </div>

      {message && (
        <p className="text-sm text-red-600 font-medium mb-2">{message}</p>
      )}
      <ReviewForm onSubmit={onSubmit} />
      {loading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-base-content/70">
            Be the first to review this product!
          </p>
        </div>
      ) : (
        <ReviewList
          reviews={reviews}
          user={user}
          editReview={editReview}
          setEditReview={setEditReview}
          editingId={editingId}
          setEditingId={setEditingId}
          handleUpdateReview={handleUpdateReview}
          handleDelete={handleDelete}
        />
      )}
    </div>
     </div>
  );
};

export default ReviewSection;
