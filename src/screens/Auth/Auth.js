import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/Button/ButtonWithBackground';
import validate from '../../utility/validation';
import paradise from '../../assets/paradise-background.jpg';
import { connect } from 'react-redux';
import { tryAuth } from '../../store/actions/index';

class AuthScreen extends Component {
  state = {
    view: Dimensions.get('window').height > 500 ? 'vert' : 'hori',
    loginMode: false,
    controls: {
      email: {
        value: 'test@t.com',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState({ loginMode: !this.state.loginMode });
  };

  updateStyles = () => {
    this.setState({
      view: Dimensions.get('window').height > 500 ? 'vert' : 'hori'
    });
  };

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };

    this.props.onTryAuth(authData, this.state.loginMode);
  };

  updateInputState = (key, value) => {
    // Connected value is to transport an object that will hold the password is we are working with confirmPassword, and confirmPassword if we are working on password
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;

      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

    // If the password gets updated, we still want to re-validate the confirmPasswords "valid" field.
    this.setState({
      controls: {
        ...this.state.controls,
        confirmPassword: {
          ...this.state.controls.confirmPassword,
          valid:
            key === 'password'
              ? validate(
                  this.state.controls.confirmPassword.value,
                  this.state.controls.confirmPassword.validationRules,
                  connectedValue
                )
              : this.state.controls.confirmPassword.valid
        },
        [key]: {
          ...this.state.controls[key],
          value,
          valid: validate(
            value,
            this.state.controls[key].validationRules,
            connectedValue
          ),
          touched: true
        }
      }
    });
  };

  render() {
    const { view, controls, loginMode } = this.state;
    const { email, password, confirmPassword } = controls;
    let headingText = null;
    let confirmPasswordText = null;
    let submitButton = (
      <ButtonWithBackground
        color="#29aaf4"
        onPress={this.authHandler}
        disabled={
          !email.valid ||
          !password.valid ||
          (!confirmPassword.valid && !loginMode)
        }
      >
        Submit
      </ButtonWithBackground>
    );

    if (view === 'vert') {
      headingText = (
        <MainText>
          <HeadingText style={styles.textHeading}>
            Please {loginMode ? 'Log In' : 'Sign Up'}
          </HeadingText>
        </MainText>
      );
    }

    if (!loginMode) {
      confirmPasswordText = (
        <View style={styles[`${view}PasswordWrapper`]}>
          <DefaultInput
            placeholder="Confirm Password"
            value={confirmPassword.value}
            onChangeText={val => this.updateInputState('confirmPassword', val)}
            valid={confirmPassword.valid}
            touched={confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ImageBackground source={paradise} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {loginMode ? 'Signup' : 'Login'}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-Mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={email.value}
                onChangeText={val => this.updateInputState('email', val)}
                valid={email.valid}
                touched={email.touched}
              />
              <View style={styles[`${view}PasswordContainer`]}>
                <View
                  style={
                    loginMode
                      ? styles.vertPasswordWrapper
                      : styles[`${view}PasswordWrapper`]
                  }
                >
                  <DefaultInput
                    placeholder="Password"
                    value={password.value}
                    onChangeText={val => this.updateInputState('password', val)}
                    valid={password.valid}
                    touched={password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordText}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {submitButton}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  vertPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  horiPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  vertPasswordWrapper: {
    width: '100%'
  },
  horiPasswordWrapper: {
    width: '45%'
  }
});

const mapState = state => ({
  isLoading: state.ui.isLoading
});

const mapDispatch = dispatch => ({
  onTryAuth: (authData, loginMode) => dispatch(tryAuth(authData, loginMode))
});

export default connect(
  mapState,
  mapDispatch
)(AuthScreen);
