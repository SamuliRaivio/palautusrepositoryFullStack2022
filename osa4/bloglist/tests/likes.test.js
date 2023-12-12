const listHelper = require("../utils/list_helper");
const testData = require("../utils/testBlogData");

//Laitetaan testi describelohkoon
describe("total likes", () => {
  //määritellään 3 listaa testeihin, yhden blogin, useamman blogin ja tyhjä lista
  //haetaan listat utils kansion testidatasta
  //testataan funktiota kaikilla listoilla
  const listWithOneBlog = testData.listWithOneBlog;

  const listWithManyBlogs = testData.listWithManyBlogs;

  const emptyBlogList = testData.emptyListOfBlogs;

  //yhden blogin testaus
  test("When list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(12);
  });

  //useamman blogin testaus
  test("Likes of blogs from a list is calculated right", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });

  //tyhjän listan testaus
  test("Empty list returns zero", () => {
    const result = listHelper.totalLikes(emptyBlogList);
    expect(result).toBe(0);
  });
});
