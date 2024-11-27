
CREATE TABLE Genre (
    GenreID INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    Name VARCHAR(50) NOT NULL
);

INSERT INTO Genre (Name) VALUES
('drama'),
('comedy'),
('scifi'),
('fantasy'),
('action'),
('thriller');


CREATE TABLE Movie (
    MovieID INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    GenreID INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    FOREIGN KEY (GenreID) REFERENCES Genre(GenreID)
);


INSERT INTO Movie (Title, Year, GenreID) VALUES
('Inception', 2010, 5), 
('The Terminator', 1984, 5), 
('Tropic Thunder', 2008, 2), 
('Borat', 2006, 2), 
('Interstellar', 2014, 1), 
('Joker', 2019, 1);


CREATE TABLE "User" (
    UserID INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    FavoriteMovieID INT,
    Name VARCHAR(50) NOT NULL,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Birthyear INT,
    FOREIGN KEY (FavoriteMovieID) REFERENCES Movie(MovieID)
);


INSERT INTO "User" (Username, Name, Password, Birthyear) VALUES
('reimarii', 'Reima Riihimäki', 'qwerty123', 1986),
('lizzy', 'Lisa Simpson', 'abcdef', 1991),
('boss', 'Ben Bossy', 'salasana', 1981);


CREATE TABLE Review (
    ReviewID INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    UserID INT NOT NULL,
    MovieID INT NOT NULL,
    Stars INT CHECK (Stars BETWEEN 1 AND 5),
    ReviewText TEXT,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID),
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID)
);


INSERT INTO Review (UserID, MovieID, Stars, ReviewText) VALUES
(1, 1, 5, 'Amazing movie with stunning visuals!'),
(2, 2, 4, 'A timeless classic.'),
(3, 3, 3, 'Funny but a bit over the top.'),
(1, 5, 5, 'A masterpiece about space exploration.');


CREATE TABLE FavoriteMovies (
    UserID INT NOT NULL,
    MovieID INT NOT NULL,
    PRIMARY KEY (UserID, MovieID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID),
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID)
);


INSERT INTO FavoriteMovies (UserID, MovieID) VALUES
(1, 1),
(1, 5), 
(2, 2), 
(3, 3);
