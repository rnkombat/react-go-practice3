package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Post struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Summary string `json:"summary"`
}

var posts []Post

var nextID = 1

func main() {
	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.GET("/api/posts", func(c *gin.Context) {
		c.JSON(http.StatusOK, posts)
	})

	r.GET("/api/posts/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
			return
		}

		for _, p := range posts {
			if p.ID == id {
				c.JSON(http.StatusOK, p)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"message": "Post not found"})
	})

	r.POST("/api/posts", func(c *gin.Context) {
		var createPost Post
		if err := c.BindJSON(&createPost); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		createPost.ID = nextID
		nextID++

		posts = append(posts, createPost)
		c.JSON(http.StatusCreated, createPost)
	})

	r.PUT("/api/posts/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
			return
		}

		var updatePost Post
		if err := c.BindJSON(&updatePost); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		for i, p := range posts {
			if p.ID == id {
				posts[i].Title = updatePost.Title
				posts[i].Summary = updatePost.Summary
				c.JSON(http.StatusOK, posts[i])
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{"message": "Post not found"})
	})

	r.Run(":8080")
}
