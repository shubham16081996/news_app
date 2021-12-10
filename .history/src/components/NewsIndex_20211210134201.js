import React, {useEffect, useState} from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const NewsIndex = (props) => {

    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    let {setprogress, country, category, apiKey, pageSize} = props

    document.title = `${category}-News`

    const updateNews = async() => {

        setprogress(60);

        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`

        setloading(false)

        let data = await fetch(url)

        let parseData = await data.json()

        setarticles(parseData.articles)
        settotalResults(parseData.totalResults)
        setloading(false)
        
             
    }


    useEffect(()=>{
        updateNews()
    })


    const FetchMoreData = async() => {

       const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`
        setpage(page+1)

        let data = await fetch(url)
        let parseData = await data.json()

        
        setarticles(articles.concat(parseData.articles))
        settotalResults(parseData.totalResults)
    }


    return (
        <>

     
            

            <h1 className='mt-2 text-center'>News - Top {category} Headlines</h1>

              {loading && <Spinner/>}
               
               <InfiniteScroll

                    dataLength={articles.length}
                    next={FetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}

                    >
                <div className='container mt-4 bg-info'>

                 <div className='row'>
                     {articles.map((e) => {

                         return <div className='col-sm-4' key={e.url}>

                                <NewsItems title={e.title?e.title.slice(0,40):""} description={e.description?e.description.slice(0,80):""} imageUrl={e.urlToImage}
                                     newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
                               </div>
                    })}
                </div>
            </div>

        </InfiniteScroll> 
        </>
    )
}

NewsIndex.defaultProps = {country:'in', pageSize:'20', category:'business'}
NewsIndex.prototypes = {country:PropTypes.string, pageSize:PropTypes.number, category:PropTypes.string}

export default NewsIndex
