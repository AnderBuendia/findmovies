import { Dispatch, SetStateAction } from 'react';
import MoviesList from '@Components/movies/MoviesList';
import SelectMovies from '@Components/home/SelectMovie';
import SelectorDate from '@Components/home/SelectorDate';
import SearchBar from '@Components/search/SearchBar';
import GenresList from '@Components/search/GenresList';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';
import { Dates } from '@Enums/heading/dates.enum';
import { DiscoverMovies } from '@Enums/heading/discover-movies.enum';

export interface HomeLayoutProps {
  data: DataMovies[];
  popularDate: string;
  handlePopularDate: Dispatch<SetStateAction<string>>;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({
  data,
  popularDate,
  handlePopularDate,
}) => {
  return (
    <MoviesList data={data}>
      <SearchBar />
      <GenresList />
      <SelectMovies discoverTitle={DiscoverMovies.TRENDING_MOVIES}>
        <SelectorDate
          popularDate={popularDate}
          handlePopularDate={handlePopularDate}
          dateTitle={Dates.TODAY}
        />
        <SelectorDate
          popularDate={popularDate}
          handlePopularDate={handlePopularDate}
          dateTitle={Dates.THIS_WEEK}
        />
      </SelectMovies>
    </MoviesList>
  );
};

export default HomeLayout;
