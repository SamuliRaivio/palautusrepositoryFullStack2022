const listHelper = require("../utils/list_helper");
const testData = require("../utils/testBlogData");

describe("Author with most likes", () => {
  //määritellään 3 listaa testeihin, yhden blogin, useamman blogin ja tyhjä lista
  //määritellään myös objekti authorWithMostLikes testausta varten
  //haetaan listat ja eniten tykkäyksiä saanut kirjailia utils kansion testidatasta
  //testataan funktiota kaikilla listoilla

  const listWithOneBlog = testData.listWithOneBlog;
  const listWithManyBlogs = testData.listWithManyBlogs;
  const emptyListOfBlogs = testData.emptyListOfBlogs;
  const authorWithMostLikes = testData.authorWithMostLikes;

  //useamman blogin testaus
  test("Author with most likes found correctly", () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toEqual(authorWithMostLikes);
  });

  //yhden blogin testaus
  test("Works with only one blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  //tyhjän listan testaus
  test("Author with most blogs found correctly", () => {
    const result = listHelper.mostLikes(emptyListOfBlogs);
    expect(result).toBe(0);
  });
});
