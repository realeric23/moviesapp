import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MovieDetails} from '../components/MovieDetails';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {RootStackParams} from '../navigation/Navigation';

const screenHeight = Dimensions.get('screen').height;

// Esto tiene el navigation y el route(route tiene movie)
interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const {isLoading, movieFull, cast} = useMovieDetails(movie.id);

  console.log({movieFull});

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.posterImage} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={35} color="grey" style={{marginTop: 5}} />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast!} />
      )}

      {/* Boton para cerrar */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" color="black" size={50} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

//70% del screenHeight
const styles = StyleSheet.create({
  imageContainer: {
    // overflow: 'hidden',
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  },
});
