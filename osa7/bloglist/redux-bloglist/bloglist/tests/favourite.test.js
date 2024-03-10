const listHelper = require("../utils/list_helper");
const testData = require("../utils/testBlogData");

describe("favourite blog", () => {
  //määritellään 3 listaa testeihin, yhden blogin, useamman blogin ja tyhjä lista
  //määritellään myös listan blogi jolla on eniten tykkäyskiä testituloksen vertailua varten
  //haetaan listat ja suosituin blogi utils kansion testidatasta
  //testataan funktiota kaikilla listoilla
  const listWithOneBlog = testData.listWithOneBlog;
  const listWithManyBlogs = testData.listWithManyBlogs;
  const emptyBlogList = testData.emptyListOfBlogs;
  const blogWithMostLikes = testData.blogWithMostLikes;

  //useamman blogin testaus
  test("Blog with most likes can be found correctly", () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs);
    expect(result).toEqual(blogWithMostLikes);
  });

  //yhden blogin testaus
  test("Works with only one blog", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    expect(result).toEqual(blogWithMostLikes);
  });

  //tyhjän listan testaus
  test("Empty list returns zero", () => {
    const result = listHelper.favouriteBlog(emptyBlogList);
    expect(result).toBe(0);
  });
});
