'use strict';

const config = require('../config');
const { Pool } = require('pg');

const pool = new Pool({
	user: config.user,
	host: config.host,
	database: config.database,
	password: config.password,
	// port: 3211,
});
const date = config.date;
const folderPath = `/home/user/esploristo-imdb/data/imdb/documents/v1/${date}`;
const movieTsvFile = `${folderPath}/movie.tsv`;
const genreTsvFile = `${folderPath}/genre.tsv`;
const movieGenreTsvFile = `${folderPath}/movie-genre.tsv`;

const queries = [`
		drop table if exists genre;
		drop table if exists movie;
		drop table if exists movie_genre;
	`, `
		create table genre (
			id int,
			id_str varchar,
			id_str_up varchar,
			constraint constraint_unique_genre_id unique(id),
			constraint constraint_unique_genre_id_str unique(id_str),
			constraint constraint_unique_genre_id_str_up unique(id_str_up)
		);
	`, `
		create table movie (
			imdb_id char(9),
			type varchar(16),
			original_title varchar(512),
			primary_title varchar(512),
			start_year int,
			end_year int,
			runtime int,
			genres varchar(256),
			constraint constraint_unique_movie_imdb_id unique(imdb_id)
		);
	`,`
		create table movie_genre (
			movie_imdb_id char(9),
			genre_id int,
			constraint
				constraint_unique_movie_genre_movie_imdb_id_genre_id
				unique(movie_imdb_id, genre_id)
		);
	`, `
		COPY genre
		FROM '${genreTsvFile}'
		WITH CSV HEADER DELIMITER AS '\t';
	`, `
		COPY movie
		FROM '${movieTsvFile}'
		WITH (
			FORMAT CSV,
			QUOTE '\b',
			HEADER true,
			DELIMITER '\t',
			NULL 'null'
		);
	`, `
		COPY movie_genre
		FROM '${movieGenreTsvFile}'
		WITH (
			DELIMITER '\t',
			HEADER true,
			FORMAT CSV
		);
	`
];

const reset = function () {
	treatNextQuery(queries);
};

const treatNextQuery = function(queries) {
	let query = queries[0];
	queries.shift();
	pool.query(query, [], (error, response) => {
		if (error) {
			console.error(error);
			throw error;
		}
		console.log(response);
		if(queries.length) {
			treatNextQuery(queries);
		} else {
			pool.end();
		}
	});
};

module.exports = reset;
