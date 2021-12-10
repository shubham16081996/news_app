import React from 'react'

const NewsItems = (props) => {

    let {title, description, imageUrl, newsUrl, author, date, source} = props 

    // Displaying News Articles Using Bootstrap Card component.

    return (
        <div className="card mt-3">
            <span className='position-absolute top-0 translate-middle
             badge rounded-pill bg-danger' style={{left:"92%", zIndex:"1"}}  >{source}</span>

            <img src={imageUrl?imageUrl:"https://i.ytimg.com/vi/jnb2dQGB6Qg/maxresdefault.jpg"} 
              className="card-img-top" style={{height:"200px"}} alt="..."/>

              <div className="card-body">
                <h5 className="card-title">{title?title:"No title Available"}</h5>
                <p className='card-text'>{description?description:"No Description Available"}</p>
                 <p className="card-text"><small className='text-muted'>
                     By {author?author:"Unknown Author"} on {new Date(date).toGMTString()}</small></p>

                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-warning">Read More</a>

            </div>
            </div>
    )
}

export default NewsItems
