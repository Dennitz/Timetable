// @flow
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { makeGetSortedAppointmentsPerDay } from '../reducers/appointments';
import TimetableDay from './TimetableDay';
import type { AppointmentsPerDay } from '../reducers/appointments';

type OwnProps = {
  /**
   * If shouldCloseLaunchScreen is true, the launch screen will be closed
   * when this component did mount. This is used to only close the launch
   * screen when the initial screen finished rendering.
   */
  shouldCloseLaunchScreen: boolean,
  week: moment$Moment,
};

type Props = OwnProps & {
  appointmentsPerDay: AppointmentsPerDay,
};

// exported for tests
export class TimetableWeek extends React.Component<Props, {}> {
  componentDidMount() {
    if (this.props.shouldCloseLaunchScreen) {
      SplashScreen.hide();
    }
  }

  render() {
    const { appointmentsPerDay, week } = this.props;
    return (
      <View>
        {appointmentsPerDay.map((appointmentsOfDay, index) => {
          const dateString = week
            .clone()
            .weekday(index)
            .format('dddd, LL');
          return (
            <TimetableDay
              day={dateString}
              appointmentsOfDay={appointmentsOfDay}
              key={dateString}
            />
          );
        })}
      </View>
    );
  }
}

function makeMapStateToProps() {
  const getSortedAppointmentsPerDay = makeGetSortedAppointmentsPerDay();
  const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) => ({
    appointmentsPerDay: getSortedAppointmentsPerDay(state, ownProps.week),
  });
  return mapStateToProps;
}

const ConnectedTimetableWeek: (props: OwnProps) => React$Element<any> = connect(
  makeMapStateToProps,
)(TimetableWeek);

export default ConnectedTimetableWeek;
