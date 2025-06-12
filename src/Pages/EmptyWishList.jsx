import { Link } from "react-router";

const EmptyWishList = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">

      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="Empty Wishlist"
        className="w-40 h-40 mb-6 opacity-80"
      />

      <h2 className="text-2xl font-semibold text-gray-700 mb-3">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500 mb-6">
        You haven’t added anything to your wishlist yet.
      </p>

      <Link
        to="/allblog"
        className="px-6 py-3 text-white font-medium bg-indigo-600 hover:bg-indigo-700 rounded transition"
      >
        Browse Blogs
      </Link>
    </div>
  );
};

export default EmptyWishList;
