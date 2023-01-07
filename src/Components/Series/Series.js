import "../Home/Home.css"
import { MovieContext } from "../../App"
import TV from '../TV/TV'
import { useContext } from "react"


const Series = () => {
    const { tvFeed } = useContext(MovieContext)
    const { getSeries } = useContext(MovieContext)
    const { tvCategories } = useContext(MovieContext)
    const { setTVGenreId } = useContext(MovieContext)

    return (
        <div className='series'>
            <div className="series_categories categories_filter">
                <ul>
                    {
                        tvCategories.map(category => (
                            <li className="genre" id={category.id} key={category.id} onClick={() => setTVGenreId(category.id)}>{category.name}</li>
                        ))
                    }
                </ul>
            </div>
            <h1 className='page_heading'>Series</h1>
            <div className='movies'>    {
                tvFeed.map(dataset => (
                    <TV key={dataset.id} id={dataset.id} movieTitle={dataset.name} movieImage={dataset.poster_path} movieRating={dataset.vote_average} movieYear={dataset.first_air_date} getSeries={getSeries} />
                ))

            }</div>
        </div>
    )
}

export default Series