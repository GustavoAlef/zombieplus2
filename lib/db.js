import { Pool } from "pg";

//const nomestring = protocolo://usuarioDeAcessoaoBanco:senhaDoUsuario@servidordoBanco:porta/bancoDesejado
const stringdb = "postgresql://postgres:qaninja@pgdb:5432/zombieplus";

const pool = new Pool({ connectionString: stringdb });

export default {
  removeByTitle: async title => {
    await pool
      .query(`DELETE FROM public.movies WHERE title = '${title}';`)
      .then(res => res)
      .catch(err => err.stack);
  },

  insertMovie: async (movie) => {
    let query = `INSERT INTO public.movies(
      title, status, year, release_date, "cast", overview, cover, created_at, updated_at)
      VALUES ('${movie.title}', '${movie.status}', 
      '${movie.year}', '${movie.releaseDate}', 
      '{${movie.cast}}', '${movie.plot}', '${movie.cover}', current_timestamp , current_timestamp);`
      
      await pool
      .query(query)
      .then(res => res)
      .catch(err => err.stack);
  },

  insertUser: async (user) => {
    let query = `INSERT INTO public.users(
      id, full_name, password, email, created_at, updated_at)
      VALUES ('${user.id}', '${user.fullName}', '${user.pass}', '${user.email}', current_timestamp, current_timestamp);`

      await pool
      .query(query)
      .then(res => res)
      .catch(err => err.stack);
  }
};
