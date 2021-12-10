import React, {useEffect, useState} from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'

const NewsIndex = (props) => {

    //Sates for our apllication

    const [articles, setarticles] = useState([])
    const [page] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    let {setprogress, country, category, apiKey, pageSize} = props   // Geting props from App.js

    
    const updateNews = async() => {

        // Fetch API

        setprogress(100);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
        let data = await fetch(url)       
        let parseData = await data.json() 
        setarticles(parseData.articles)
        settotalResults(parseData.totalResults)        
    }

    useEffect(()=>{
        document.title = `${category}-News`
        updateNews()
    })


    return (
        <>
        {/* Sending Props to NewsItem Component */}

            <h1 className='mt-2 text-center'>News - Top {category} Headlines</h1>
                <div className='container mt-4 bg-info'>
                 <div className='row'>
                     {articles.map((e) => {
                         return <div className='col-sm-4' key={e.url}>
                            <NewsItems title={e.title?e.title.slice(0,40):""} description={e.description?e.description.slice(0,80):""} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
                    </div>
                    })}
                </div>
            </div>
        </>
    )
}

// Default Props And PropTypes

NewsIndex.defaultProps = {country:'in', pageSize:38, category:'business'}
NewsIndex.prototypes = {country:PropTypes.string, pageSize:PropTypes.number, category:PropTypes.string}

export default NewsIndex
