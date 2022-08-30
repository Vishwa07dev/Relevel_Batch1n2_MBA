exports.movieListResponse = (movies) => {
    movieResult = [];
    movies.forEach(movie => {
       movieResult.push({
            name: movie.name,
            description: movie.description,
            cast: movie.cast, 
            director: movie.director,
            trailerUrls: movie.trailerUrls,
            posterUrls: movie.posterUrls,
            language: movie.language,
            releaseDate: movie.releaseDate,
            releaseStatus: movie.releaseStatus,
            imdbRating: movie.imdbRating,
            id: movie._id,
            createdAt: movie.createdAt,
            updatedAt: movie.updatedAt 
       });   
    });
    return movieResult;
}

exports.userSignUpObject = (user) => {
    return {
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }   
}
exports.userSignInObject = (user) => {
    return {
        WARNING: "Access Token is valid only for 60 seconds, RefreshToken valid only for 600 seconds",
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
       
    }  
}

exports.ticketBookingObj = (ticket) => {
    /**
 *   theatreId
 *     movieId
 *     userId ( ref )
 *     timing
 *     status ( IN_PROGRESS | COMPLETED | CANCELLED | FAILED) 
 *     noOfSeats
 *     totalCost
 *     createdAt
 *     updatedAt
 * 
 */
    return {
        userId: ticket.userId,
        bookingId: ticket._id,
        theatreId: ticket.theatreId,
        movieId: ticket.movieId,
        timing: ticket.timing,
        status: ticket.status,
        noOfTickets: ticket.noOfTickets,
        totalCost: ticket.totalCost,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    }
}

exports.bookingListResponse = (bookings) => {
    bookingResult = [];
    bookings.forEach(booking => {
       bookingResult.push({
        userId: booking.userId,
        bookingId: booking._id,
        theatreId: booking.theatreId,
        movieId: booking.movieId,
        timing: booking.timing,
        status: booking.status,
        noOfTickets: booking.noOfTickets,
        totalCost: booking.totalCost,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
       });   
    });
    return bookingResult;
}