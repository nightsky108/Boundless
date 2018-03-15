import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Link } from 'react-router'

import Helmet from 'react-helmet'
import favicon from '../../images/favicon.ico'
const meta = [
  { charset: 'utf-8' },
  // Meta descriptions are commonly used on search engine result pages to
  // display preview snippets for a given page.
  { name: 'Boundless Internships', content: 'Internship Tracker' },
  // Setting IE=edge tells Internet Explorer to use the latest engine to
  //  render the page and execute Javascript
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  // Using the viewport tag allows you to control the width and scaling of
  // the browser's viewport:
  // - include width=device-width to match the screen's width in
  // device-independent pixels
  // - include initial-scale=1 to establish 1:1 relationship between css pixels
  // and device-independent pixels
  // - ensure your page is accessible by not disabling user scaling.
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  // Disable tap highlight on IE
  { name: 'msapplication-tap-highlight', content: 'no' },
  // Add to homescreen for Chrome on Android
  { name: 'mobile-web-app-capable', content: 'yes' },
  // Add to homescreen for Safari on IOS
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
  { name: 'apple-mobile-web-app-title', content: 'Boundless Internships' }
]
// Add to homescreen for Chrome on Android
const link = [{ rel: 'icon', href: favicon }]

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import FontIcon from 'react-md/lib/FontIcons'

@connect(
  state => ({
    screen: state.screen
  })
)
class Template extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object,
    screen: PropTypes.object
  }
  static defaultProps = {
    children: null,
    router: {},
    screen: {}
  }
  navItems = [{
    primaryText: 'Home',
    leftIcon: <FontIcon>home</FontIcon>,
    component: Link,
    to: '/'
  }, {
    primaryText: 'Internships',
    leftIcon: <FontIcon>dashboard</FontIcon>,
    component: Link,
    to: '/interns'
  }, {
    primaryText: 'Co-Op Programs',
    leftIcon: <FontIcon>error</FontIcon>,
    component: Link,
    to: '/coops'
  }, {
    primaryText: 'New Grads',
    leftIcon: <FontIcon>error</FontIcon>,
    component: Link,
    to: '/grads'
  }, {
    divider: true
  }]
  render (
    { navItems } = this,
    { children, router, screen, user } = this.props
  ) {
    // React-router is separated from redux store - too heavy to persist
    return (
      <div>
        <Helmet
          titleTemplate='%s - Boundless'
          meta={meta} link={link}
        />
        <NavigationDrawer
          drawerTitle='Pipelines'
          toolbarTitle={'Boundless Internships'}
          contentClassName='main-content'
          navItems={navItems}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
        >
          <div className='main-container'>
            {children}
          </div>
        </NavigationDrawer>
      </div>
    )
  }
}

export default Template
