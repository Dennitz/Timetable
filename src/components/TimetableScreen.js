// @flow
import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  View,
} from 'react-native';
import moment from 'moment';
import i18n from 'react-native-i18n';

import TimetableWeek from '../containers/TimetableWeek';
import { AddButton, EditButton } from '../components/NavButtons';
import CourseFormScreen from '../containers/CourseFormScreen';
import { COURSE_FORM, EDIT_SELECTION } from '../screens';
import styles from './styles/TimetableScreen.styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SCREEN_WIDTH = Dimensions.get('window').width;
const START_YEAR = 2010;
const END_YEAR = 2050;
const START_MOMENT = moment().year(START_YEAR).startOf('year').startOf('week');
const END_MOMENT = moment().year(END_YEAR).startOf('year').startOf('week');

type Props = {
  navigator: NativeNavigator,
}

function getWeeks() {
  const weeks = [];
  const current = START_MOMENT.clone();
  while (current.isSameOrBefore(END_MOMENT)) {
    weeks.push(current.clone());
    current.add(1, 'week');
  }
  return weeks;
}

function getCurrentWeekIndex() {
  return moment().startOf('week').diff(START_MOMENT, 'weeks');
}

const WEEKS = getWeeks();

/**
 * The main screen of the app.
 * Uses a horizontal FlatList to render a timetable for each week.
 */
export default class TimetableScreen extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: true,
    statusBarTextColorScheme: 'light',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      // FlatList doesn't call onScroll with values of contentOffset, so the initial
      // value needs to be set manually so that the value is correct before first scroll
      scrollAnimX: new Animated.Value(SCREEN_WIDTH * getCurrentWeekIndex()),
    };
  }

  state: {
    scrollAnimX: Animated.AnimatedValue;
  };

  _flatList: FlatList;
  props: Props;

  _scrollToCurrentWeek = () => {
    this._flatList.getNode().scrollToIndex({ index: getCurrentWeekIndex() });
  };

  _renderButtons = () => (
    <View style={styles.buttonContainer}>
      <AddButton
        onPress={() => this.props.navigator.showModal({
          screen: COURSE_FORM,
          title: i18n.t('Course'),
          navigatorButtons: {
            ...CourseFormScreen.navigatorButtons,
            leftButtons: [
              {
                id: 'cancel',
                title: i18n.t('Cancel'),
              },
            ],
          },
        })}
      />
      <EditButton
        onPress={() => this.props.navigator.showModal({
          screen: EDIT_SELECTION,
          title: i18n.t('Courses'),
        })}
      />
    </View>
  );

  /**
   * navbar title is rendered per week for swipe effect
   */
  _renderNavBarTitle = (week: moment, index: number) => {
    const offset = index * SCREEN_WIDTH;
    const navBarTitleOpacity = this.state.scrollAnimX.interpolate({
      inputRange: [
        offset - (SCREEN_WIDTH / 2),
        offset - (SCREEN_WIDTH / 4),
        offset,
        offset + (SCREEN_WIDTH / 4),
        offset + (SCREEN_WIDTH / 2),
      ],
      outputRange: [0.3, 0.9, 1, 0.9, 0.3],
      extrapolate: 'clamp',
    });
    const navBarTitle = `${week.format(i18n.t('month-day-format'))} - ${
      week.clone().endOf('week').format(i18n.t('month-day-format'))}`;
    return (
      <View style={styles.navBarTitleContainer}>
        <Animated.Text style={[styles.navBarTitle, { opacity: navBarTitleOpacity }]}>
          {navBarTitle}
        </Animated.Text>
      </View>
    );
  };

  _renderWeek = (week: moment, index: number) => (
    <View>
      {this._renderNavBarTitle(week, index)}
      <ScrollView
        key={week.format('D MMM YYYY')}
        style={{ width: SCREEN_WIDTH }}
        removeClippedSubviews={false}
        scrollsToTop={false}
      >
        <TimetableWeek week={week} />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <TouchableWithoutFeedback onPress={this._scrollToCurrentWeek}>
          <View style={styles.navBarBackground}>
            {this._renderButtons()}
          </View>
        </TouchableWithoutFeedback>
        <AnimatedFlatList
          ref={(flatList) => { this._flatList = flatList; }}
          data={WEEKS}
          keyExtractor={month => month.format('D MMM YYYY')}
          renderItem={({ item, index }) =>
            this._renderWeek(item, index)}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          contentOffset={{ x: SCREEN_WIDTH * getCurrentWeekIndex(), y: 0 }}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={0}
          updateCellsBatchingPeriod={10}
          removeClippedSubviews={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.scrollAnimX } } }],
            { useNativeDriver: true },
          )}
          style={styles.horizontalList}
        />
      </View>
    );
  }
}
