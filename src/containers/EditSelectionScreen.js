// @flow
import React from 'react';
import { LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import i18n from 'react-native-i18n';

import EditSelection from '../components/EditSelection';
import { getCoursesSortedByName } from '../reducers/courses';
import { removeCourse } from '../actions/course-actions';
import { COURSE_FORM } from '../screens';
import { navBar } from '../themes';
import { iconSources } from '../lib/iconSources';

type Props = {
  courses: Array<Course>,
  dispatch: Function,
  navigator: NativeNavigator,
}

const editAnimation = LayoutAnimation.create(100, 'linear', 'opacity');
const deleteAnimation = LayoutAnimation.create(80, 'linear', 'opacity');

class EditSelectionScreen extends React.Component {
  static navigatorStyle = navBar;
  static navigatorButtons: NavigatorButtons = {
    leftButtons: [
      {
        id: 'cancel',
        icon: iconSources.close,
      },
    ],
    rightButtons: [
      {
        id: 'edit',
        title: i18n.t('Edit'),
      },
    ],
  };

  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this._handleNavigatorEvent);
    this.state = {
      editing: false,
    };
  }

  state: {
    editing: boolean,
  };

  _handleNavigatorEvent = (event: Object) => {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        navigator.dismissModal();
      }
      if (event.id === 'edit') {
        LayoutAnimation.configureNext(editAnimation);

        this.setState({ editing: !this.state.editing });

        const newTitle = this.state.editing ? 'Done' : 'Edit';
        this.props.navigator.setButtons({
          rightButtons: [
            {
              id: 'edit',
              title: i18n.t(newTitle),
            },
          ],
          animated: true,
        });
      }
    }
  };

  _handleRemovePress = (courseId, appointmentIds) => {
    const { dispatch } = this.props;
    LayoutAnimation.configureNext(deleteAnimation);
    dispatch(removeCourse(courseId, appointmentIds));
  };

  props: Props;

  render() {
    const { courses, navigator } = this.props;
    return (
      <EditSelection
        courses={courses}
        showRemoveButtons={this.state.editing}
        onRemovePress={this._handleRemovePress}
        onPress={id => navigator.push({
          screen: COURSE_FORM,
          title: i18n.t('Course'),
          backButtonTitle: i18n.t('Cancel'),
          passProps: {
            courseId: id,
          },
        })}
      />
    );
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    courses: getCoursesSortedByName(state),
  };
}

export default connect(mapStateToProps)(EditSelectionScreen);
