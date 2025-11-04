const cloudinaryAPI = process.env.CLOUDINARY_BASE_URL;

exports.seed = async function(knex) {
  await knex('artists').del();

  await knex('artists').insert([
    { 
        id: 1,
        name: "Neperia",
        description: "Neperia is a Greek Symphonic Metal band with all the attributes of the Symphonic Female-Fronted genre and many aspects of Death Metal sound. The band formed in 2008 at Ioannina city and in the next years performed a big number of lives as an opening act to many beloved bands and artists such as Paul Di'Anno, Firewind, Joe Lynn Turner, Ron Bumblefoot Thal, Innerwish, Jelusick and many more.",
        media: {
          instagram: "https://www.instagram.com/neperiaofficial",
          facebook: "https://www.facebook.com/Neperiaofficial",
          youtube: "https://www.youtube.com/@NeperiaOfficial",
          twitter: "https://x.com/NeperiaOfficial",
          mail: "mailto:neperia@live.com",
        },
        image_url: `${cloudinaryAPI}/image/upload/v1762255171/avatar_rvj7py.jpg`,
    },
  ]);
};