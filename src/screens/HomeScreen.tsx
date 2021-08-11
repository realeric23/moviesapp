import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {GradientBackground} from '../components/GradientBackground';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {MoviePoster} from '../components/MoviePoster';
import {GrandientContext} from '../context/GradientContext';
import {getImageColors} from '../helpers/getColors';
import {useMovies} from '../hooks/useMovies';

const windowWidth = Dimensions.get('window').width;

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GrandientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({primary, secondary});
  };

  //Si nowPlaying > 0 tenemos una pelicula // hace que se actualize los colores en base a nowPlaying
  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Principal Carousel */}
          <View
            style={{
              height: 440,
            }}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Popular Movies  */}

          <HorizontalSlider title="Popular Movies" movies={popular} />
          <HorizontalSlider title="Top Rated Movies" movies={topRated} />
          <HorizontalSlider title="Upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
