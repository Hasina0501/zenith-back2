const http = require('http');

const baseURL = 'http://localhost:3000/api/article';

async function testCRUD() {
  try {
    console.log("1. Creating an article...");
    const createRes = await fetch(`${baseURL}/create_article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "Test Article", content: "This is a test content" })
    });
    const textRes = await createRes.text();
    console.log("Response text:", textRes);
    const createdArticle = JSON.parse(textRes);
    console.log("Created:", createdArticle);

    if (!createdArticle.id) throw new Error("Article creation failed");
    const articleId = createdArticle.id;

    console.log("\n2. Getting all articles...");
    const getAllRes = await fetch(`${baseURL}/get_all_article`);
    const allArticles = await getAllRes.json();
    console.log(`Found ${allArticles.length} articles`);

    console.log(`\n3. Getting article by ID (${articleId})...`);
    const getOneRes = await fetch(`${baseURL}/get_one_article/${articleId}`);
    const oneArticle = await getOneRes.json();
    console.log("Retrieved:", oneArticle.title);

    console.log(`\n4. Updating article (${articleId})...`);
    const updateRes = await fetch(`${baseURL}/update_article/${articleId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "Updated Test Article", content: "Updated content" })
    });
    const updatedArticle = await updateRes.json();
    console.log("Updated title:", updatedArticle.title);

    console.log(`\n5. Deleting article (${articleId})...`);
    const deleteRes = await fetch(`${baseURL}/delete_article/${articleId}`, {
      method: 'DELETE'
    });
    const deleteResult = await deleteRes.json();
    console.log("Delete result:", deleteResult);

    console.log("\n✅ All CRUD operations tested successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testCRUD();
