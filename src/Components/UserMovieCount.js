import React from "react";

const UserMovieCount = props => {
  const { userMovies, user, loginStatus } = props;

  return (
    <div className="user-movie-count">
      {userMovies.length === 1
        ? `You've seen ${userMovies.length} movie this year.`
        : `You've seen ${userMovies.length} movies this year.`}
    </div>
  );
};

// (
//   <>
//     {loginStatus ? (
//       <div className="user-movie-count">
//         {userMovies.length === 1
//           ? `Hey ${user.displayName
//               .split(" ")
//               .slice(0, -1)
//               .join(" ")}, you've seen ${userMovies.length} movie this year.`
//           : `Hey ${user.displayName
//               .split(" ")
//               .slice(0, -1)
//               .join(" ")}, you've seen ${
//               userMovies.length
//             } movies this year.`}
//       </div>
//     ) : (
//       <div className="user-movie-count">
//         {userMovies.length === 1
//           ? `You've seen ${userMovies.length} movie this year.`
//           : `You've seen ${userMovies.length} movies this year.`}
//       </div>
//     )}
//   </>
// );

export default UserMovieCount;
