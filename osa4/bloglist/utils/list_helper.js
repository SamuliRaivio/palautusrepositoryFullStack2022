//apufunktioita tällä hetkellä vain testaamiseen
const _ = require("lodash");
const testData = require("./testBlogData");

//dummy on dummy funktio testien harjoitteluun
//funktion tarkoitus on vain palauttaa 1
const dummy = (blogs) => {
  blogs = 1;
  return blogs;
};

//testidataa
const blogTestList = testData.listWithManyBlogs;

//totalLikes palauttaa blogilistan kaikkien blogien tykkäykset
const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0);

  return likes;
};

//favouriteblog palauttaa listasta blogin jolla on eniten tykkäyksiä
const favouriteBlog = (blogs) => {
  const favourite = blogs.reduce((sum, blog) => {
    return sum.likes > blog.likes ? sum : blog;
  }, 0);

  return favourite;
};

//mostBlogs palauttaa kirjoittajan jolla on eniten blogipostauksia listasta sekä niiden lukumäärän
const mostBlogs = (blogs) => {
  //jos lista on tyhjä palautetaan 0
  if (blogs.length === 0) {
    return 0;
  }

  //authorCount luo olion kirjoittajista ja kuinka monta kertaa ne esiintyy listassa
  const authorCount = _.countBy(blogs, "author");

  //maxCount hakee suurimman arvon authorCount-oliosta
  //tätä käytetään siis myös siihen kuinka monta blogipostausta kirjoittajalla on
  const maxCount = _.max(_.values(authorCount));

  //mostCommonAuthor, _.pickBy functio hakee authorCount oliosta attribuution jonka arvo täsmää maxCountin arvoon
  //_.key luo listan jossa on vain kirjoittajan nimi
  const mostCommonAuthor = _.keys(
    _.pickBy(authorCount, (count) => count === maxCount)
  );

  //Luodaan lopuksi uusi olio jolla on attribuutit nimi "author" ja bloggauksien lukumäärä "blogs"
  const nameAndBlogs = {
    author: mostCommonAuthor[0],
    blogs: maxCount,
  };

  return nameAndBlogs;
};

//mostLikes palauttaa kirjoittajan jolla on eniten tykkäyksiä yhteenlaskettuna kaikki postaukset ja tykkäysten määrän
//funtion olisi varmasti voinut tehdä paljon simppelimmin mutta tämä ainakin toimii
const mostLikes = (blogs) => {
  //jos lista on tyhjä palautetaan 0
  if (blogs.length === 0) {
    return 0;
  }

  //haetaan yhdet blogit jokaiselta uniikilta kirjoittajalta
  const uniq = _.uniqBy(blogs, "author");

  //muutetaan lista vain sisältämään kirjailijat
  const uniqAuthors = uniq.map((blog) => blog.author);

  //haetaan kaikista blogeista listan kirjailijalla hänen blogit ja laitetaan listaan
  //nyt lista sisältää omat listat kaikkien uniikkien kirjoittajien blogeista
  const blogsByAuthors = uniqAuthors.map((author) =>
    blogs.filter((blog) => blog.author === author)
  );

  //käydään listat objekteiksi jotka sisältävät kirjailijan nimen ja kaikkien hänen blogien tykkäykset
  const authorAndLikes = blogsByAuthors.map((author) => {
    const l = author.reduce((sum, blog) => sum + blog.likes, 0);
    const n = author[0].author;
    return {
      author: n,
      likes: l,
    };
  });

  //käydään läpi kenellä on eniten tykkäyksiä ja palautetaan se olio
  const authorWithMostLikes = authorAndLikes.reduce((sum, author) => {
    return sum.likes > author.likes ? sum : author;
  }, 0);

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
