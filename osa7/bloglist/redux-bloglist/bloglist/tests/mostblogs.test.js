const listHelper = require("../utils/list_helper");
const testData = require("../utils/testBlogData");

describe("Author with most blogs", () => {
  //määritellään 3 listaa testeihin, yhden blogin, useamman blogin ja tyhjä lista
  //määritellään myös objekti authorWithMostBlogs testausta varten
  //haetaan listat ja eniten kirjoittanut utils kansion testidatasta
  //testataan funktiota kaikilla listoilla
  const listWithOneBlog = testData.listWithOneBlog;
  const listWithManyBlogs = testData.listWithManyBlogs;
  const emptyListOfBlogs = testData.emptyListOfBlogs;
  const authorWithMostBlogs = testData.authorWithMostBlogs;

  //useamman blogin testaus
  test("Author with most blogs found correctly", () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual(authorWithMostBlogs);
  });

  //yhden blogin testaus
  test("Works with only one blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  //tyhjän listan testaus
  test("Author with most blogs found correctly", () => {
    const result = listHelper.mostBlogs(emptyListOfBlogs);
    expect(result).toBe(0);
  });
});
