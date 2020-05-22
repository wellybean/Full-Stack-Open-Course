const dummy = (blogs) => {
    return 1
}

const totalLikes = (listOfBlogs) => {
    return listOfBlogs.reduce((acc, blog) => 
        acc + blog.likes, 0
    )
}

const favoriteBlog = (listOfBlogs) => {
    return listOfBlogs.reduce((max, current) => 
        (max.likes < current.likes) ? current : max
    )
}

const mostBlogs = (listOfBlogs) => {
    const authors = []
    
    listOfBlogs.forEach(blog => {
        const author = authors.find(author => author.name === blog.author)
        
        if (author) {
            const newNumberOfBlogs = author.numberOfBlogs + 1
            authors[authors.findIndex(a => a === author)] = {
                name: author.name,
                numberOfBlogs: newNumberOfBlogs
            }
        } else {
            authors.push({ name: blog.author, numberOfBlogs: 1})
        }
    })

    return authors.reduce((max, current) => 
        (max.numberOfBlogs < current.numberOfBlogs) ? current : max
    )
}

const mostLikes = (listOfBlogs) => {
    const authors = []
    
    listOfBlogs.forEach(blog => {
        const author = authors.find(author => author.name === blog.author)
        
        if (author) {
            const newNumberOfLikes = author.numberOfLikes + blog.likes
            authors[authors.findIndex(a => a === author)] = {
                name: author.name,
                numberOfLikes: newNumberOfLikes
            }
        } else {
            authors.push({ name: blog.author, numberOfLikes: blog.likes})
        }
    })

    return authors.reduce((max, current) => 
        (max.numberOfLikes < current.numberOfLikes) ? current : max
    )
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}