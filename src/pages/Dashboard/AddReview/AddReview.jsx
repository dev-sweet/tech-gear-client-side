import { useState } from "react";

const AddReview = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the data to your backend or store it in your state
    console.log({ name, rating, review });

    // Show success message
    setSuccessMessage("Thank you for your review!");

    // Reset the form
    setName("");
    setRating(1);
    setReview("");
  };
  return (
    <div className="container mx-auto p-28">
      <h1 className="text-2xl font-bold mb-4">Add Your Review</h1>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-lg">
        <h2 className="text-2xl text-center text-semibold">RATE US</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Do you have any suggetion for us?
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-semibold mb-2">
            Kindly express your experience with us.
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded"
        >
          Submit Review
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
    </div>
  );
};

export default AddReview;
