import React, { PropTypes, Component } from 'react';
import Logo from '../containers/logoContainer';
import HeaderLinks from '../containers/headerLinksContainer';
import Contact from '../containers/contactContainer';
import Burger from '../containers/burgerContainer';
import _ from 'lodash';
import { breakpoint } from '../config/constants';

let $ = window.$, $window = $(window), ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Power3 = window.Power3, TimelineLite = window.TimelineLite;

class Header extends Component {
    constructor(...args) {
        super(...args);
        this.openContact = this.openContact.bind(this);
        this.closeContact = this.closeContact.bind(this);
        this.getContactPieces = this.getContactPieces.bind(this);
        this.setInitialScroll = this.setInitialScroll.bind(this);
        this.getInitialScroll = this.getInitialScroll.bind(this);
        this.initialScroll = undefined;
        this.timeLines = [];
    }

    setInitialScroll(scroll){
        this.initialScroll = scroll;
        this.props.setInitialScroll && this.props.setInitialScroll(scroll);
    }
    getInitialScroll(){
        if(typeof(this.initialScroll) === 'undefined' )
        {
            return $window.scrollTop();
        }
        else{
            return this.initialScroll;
        }
    }

    componentDidMount() {
        let header = this.header = $(this.refs.header);
        this.article = header.closest('article.page');
        this.links = this.header.find('nav ul li a').toArray();
        this.burgerOpen = this.header.find('.hamburger > .open');
        this.burgerClose = this.header.find('.hamburger > .close');
        this.contactClose = this.header.find('.contact .btn .content');
        this.logoText = this.header.find('.logo .text svg');
        this.logoImage = this.header.find('.logo .img');
        this.headerImage = this.header.find('.image .img');
        this.headerText = this.header.find('.text h1');

        if (this.props.isHomepage) {
            this.homeLeft = [
                this.article.find('.slide-1.content .text-2 h2').toArray(),
                this.article.find('.slide-2.content .text-1 h1, .slide-2.content .text-3 .text-content').toArray(),
                this.article.find('.slide-3.content .text-2 h2').toArray(),
                this.article.find('.slide-4.content .text-1 h1').toArray(),
            ];
            this.homeRight = [
                this.article.find('.slide-1.content .text-1 h1').toArray(),
                this.article.find('.slide-2.content .text-2 .text-content').toArray(),
                this.article.find('.slide-3.content .text-1 h1').toArray(),
                {},
            ];
            this.smallHomeLeft = [
                this.article.find('.slide-1.content .text-1 h1, .slide-1.content .text-2 h2').toArray(),
                this.article.find('.slide-2.content .text-1 h1').toArray(),
                this.article.find('.slide-3.content .text-1 h1, .slide-3.content .text-2 h2').toArray(),
                this.article.find('.slide-4.content .text-1 h1').toArray(),
            ];
            this.homeBottom = [
                this.article.find('.scroll-hint > *').toArray(),
                this.article.find('.scroll-hint > *').toArray(),
                this.article.find('.scroll-hint > *').toArray(),
                this.article.find('.scroll-hint > *').toArray(),
            ];
            this.homeImage = [
                this.article.find('.slide-1.background .img').toArray(),
                this.article.find('.slide-2.background .img').toArray(),
                this.article.find('.slide-3.background .img').toArray(),
                this.article.find('.slide-4.background .img').toArray(),
            ];
        }

        this.handleMediaChange(this.props.ui.media);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.ui.media.current != nextProps.ui.media.current) {
            this.handleMediaChange(nextProps.ui.media);
        }
        if (this.props.transition.type != nextProps.transition.type
            && nextProps.transition.type == 'openContact') {
            this.openContact(nextProps.transition.type);
        }
        return false;
    }

    componentWillUnmount() {
        for (let i = 0; i < this.timeLines.length; i++) {
            this.timeLines[i] = null;
        }
    }

    handleMediaChange(media) {
        // console.warn('header handleMediaChange', media, this.props.isHomepage, $window.scrollTop());

        let menuIsOpen = this.article.hasClass('menu-open');
        let contactIsOpen = this.article.hasClass('contact-open');

        if (!this.props.isHomepage) {
            //!contactIsOpen && !menuIsOpen && this.article.removeClass('fix-header');
            // if ($window.scrollTop() < 400) {
            //     !contactIsOpen && !menuIsOpen && this.article.removeClass('fix-header');
            // } else {
            //     this.article.addClass('fix-header');
            // }
        }
    }

    render() {
        if (this.props.isHomepage) {
            return (
                <header className="main" ref="header">
                    <div className="container">
                        <Logo isHomepage getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                        <HeaderLinks isHomepage openContact={this.openContact} getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll} highlightAbout={this.props.highlightAbout} highlightExpertise={this.props.highlightExpertise} highlightPortfolio={this.props.highlightPortfolio}/>
                        <Burger isHomepage getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                        <Contact isHomepage renderCloseButton closeContact={this.closeContact} getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                    </div>
                </header>
            );
        } else {
            return (
                <header className="main" ref="header">
                    <div className="container">
                        <div className="image"><div className="img" /></div>
                        <div className="gradient" />
                        <div className="text"><h1>{this.props.title}</h1></div>
                        <Logo getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                        <HeaderLinks openContact={this.openContact} getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll} highlightAbout={this.props.highlightAbout} highlightExpertise={this.props.highlightExpertise} highlightPortfolio={this.props.highlightPortfolio}/>
                        <Burger getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                        <Contact renderCloseButton closeContact={this.closeContact} getInitialScroll={this.getInitialScroll} setInitialScroll={this.setInitialScroll}/>
                    </div>
                </header>
            );
        }
    }

    ////
    //  CONTACT PAGE STUFF
    ///////////////////////////

    getContactPieces() {
        let isLarge = this.props.ui.media.current == breakpoint.names.large;
        let isMedium = this.props.ui.media.current == breakpoint.names.medium;
        let isSmall = this.props.ui.media.current == breakpoint.names.small;

        let contactPieces = { left: [], right: [] };//this.header.find('.contact .content');
        if (isLarge) {
            contactPieces.left = this.header.find('.contact .content').toArray();
        }
        if (isMedium) {
            contactPieces.left = this.header.find('.contact .right .content').toArray();
            contactPieces.right = this.header.find('.contact .left .content, .contact .btn .content').toArray();
        }
        if (isSmall) {
            contactPieces.left = this.header.find('.contact .left .content, .contact .right .content').toArray();
            contactPieces.right = this.header.find('.contact .btn .content').toArray();
        }

        return contactPieces;
    }

    openContact(event) {
        if (event != 'openContact') {
            event.preventDefault();
        }

        if (this.inProgress) {
            return false;
        }
        this.inProgress = true;
        let burgerIsOpen = this.article.hasClass('menu-open');
        let pieces = this.getContactPieces();
        let isLarge = this.props.ui.media.current == breakpoint.names.large;

        this.article.addClass('contact-open');

        if (event == 'openContact') { //a content link opens contact, we may be scrolled
            let scrollTop = $window.scrollTop();
            this.setInitialScroll(scrollTop);
            this.props.disableScenes();
            $.scrollLock(true);

            this.initialHeight = 400 - scrollTop;
            this.initialHeight < 0 && (this.initialHeight = 0);
            this.article.addClass('menu-open');

            let scrollIsTop = scrollTop == 0;
            let scrollIsHeaderTop = 0 < scrollTop <= 355;
            let scrollIsHeaderBottom = 355 < scrollTop <= 400;
            let scrollIsUnderHeaderBottom = 355 < scrollTop;
            let scrollIsUnderHeader = 400 < scrollTop;

            scrollIsUnderHeader && TweenMax.set(this.headerText, { x: '-100%', ease: Power3.easeOut });
            scrollIsUnderHeader && TweenMax.set(this.headerImage, { opacity: 0, ease: Power3.easeOut });

            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline) })
                .add(_.filter([
                    scrollIsTop && TweenMax.to(this.links, .3, { x: '-100%', ease: Power3.easeOut }),
                    scrollIsTop && TweenMax.to(this.logoText, .3, { x: '-100%', ease: Power3.easeOut }),
                    !scrollIsTop && TweenMax.to(this.burgerOpen, .3, { x: isLarge ? '-100%' : '105%', ease: Power3.easeOut }),
                    scrollIsUnderHeaderBottom && TweenMax.to(this.logoImage, .3, { color: '#fefefe', ease: Power3.easeOut }),
                    scrollIsUnderHeaderBottom && TweenMax.to(this.burgerOpen, .3, { color: '#fefefe', ease: Power3.easeOut }),
                    !scrollIsUnderHeader && TweenMax.to(this.headerText, .3, { x: '-100%', ease: Power3.easeOut }),
                    !scrollIsUnderHeader && TweenMax.to(this.headerImage, .3, { opacity: 0, ease: Power3.easeOut }),
                ]))
                .add((() => {
                    this.article.addClass('fix-header');
                }).bind(this))
                .add(_.filter([
                    TweenMax.fromTo(this.header, .6, { height: this.initialHeight }, { height: '100%', ease: Power3.easeOut }),
                ]))
                .add(_.filter([
                    TweenMax.fromTo(pieces.left, .3, { x: '-100%' }, { x: '0%', ease: Power3.easeOut }),
                    TweenMax.fromTo(pieces.right, .3, { x: '105%' }, { x: '0%', ease: Power3.easeOut }),
                ]));
        } else if (burgerIsOpen) { //small ALL scenarios, medium ALL scenarios + Large Generic pege when burger open
            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline) })
                .add(_.filter([
                    TweenMax.to(this.links, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.logoText, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.burgerClose, .3, { x: isLarge ? '-100%' : '105%', ease: Power3.easeIn }),
                ]))
                .add(_.filter([
                    TweenMax.fromTo(pieces.left, .3, { x: '-100%' }, { x: '0%', ease: Power3.easeOut }),
                    TweenMax.fromTo(pieces.right, .3, { x: '105%' }, { x: '0%', ease: Power3.easeOut }),
                ]));
        } else if (this.props.isHomepage) { //header contact link on Large Homepage
            this.setInitialScroll($window.scrollTop());
            this.props.disableScenes();
            $.scrollLock(true);

            TweenMax.set(this.header, { height: '100%' });

            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline) })
                .add(_.filter([
                    TweenMax.to(this.homeLeft, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.links, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.logoText, .3, { x: '-100%', ease: Power3.easeIn }),
                    TweenMax.to(this.homeRight, .3, { x: '105%', ease: Power3.easeIn }),
                    TweenMax.to(this.homeBottom, .3, { y: '200px', ease: Power3.easeIn }),

                    TweenMax.to(this.homeImage, .6, { opacity: 0, ease: Power3.easeInOut }),

                    TweenMax.fromTo(pieces.left, .3, { x: '-100%' }, { x: '0%', delay: .3, ease: Power3.easeOut }),
                    TweenMax.fromTo(pieces.right, .3, { x: '105%' }, { x: '0%', delay: .3, ease: Power3.easeOut }),
                ]));
        } else { //header contact link on Large Generic page when scroll = 0
            this.setInitialScroll($window.scrollTop());
            this.initialHeight = 400 - $window.scrollTop();
            this.props.disableScenes();
            $.scrollLock(true);

            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline) })
                .add(_.filter([
                    TweenMax.to(this.links, .3, { x: '-100%', ease: Power3.easeOut }),
                    TweenMax.to(this.logoText, .3, { x: '-100%', ease: Power3.easeOut }),
                    TweenMax.to(this.headerText, .3, { x: '-100%', ease: Power3.easeOut }),
                    TweenMax.to(this.headerImage, .3, { opacity: 0, ease: Power3.easeOut }),
                ]))
                .add((() => {
                    this.article.addClass('fix-header');
                }).bind(this))
                .add(_.filter([
                    TweenMax.fromTo(this.header, .6, { height: this.initialHeight }, { height: '100%', ease: Power3.easeOut }),
                ]))
                .add(_.filter([
                    TweenMax.fromTo(pieces.left, .3, { x: '-100%' }, { x: '0%', ease: Power3.easeOut }),
                    TweenMax.fromTo(pieces.right, .3, { x: '105%' }, { x: '0%', ease: Power3.easeOut }),
                ]));
        }

        return false;

        function onComplete(timeline) {
            timeline = null;
            this.inProgress = false;
        }
    }

    closeContact(event) {

        event.preventDefault();

        if (this.inProgress) {
            return false;
        }
        this.inProgress = true;
        let burgerIsOpen = this.article.hasClass('menu-open');
        let pieces = this.getContactPieces();

        if (burgerIsOpen) { //small ALL scenarios, medium ALL scenarios + Large Generic pege when burger open
            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline, false) })
            .add(_.filter([
                TweenMax.to(pieces.left, .3, { x: '-100%', ease: Power3.easeIn }),
                TweenMax.to(pieces.right, .3, { x: '105%', ease: Power3.easeIn }),
            ]))
            .add(_.filter([
                TweenMax.to(this.links, .3, { x: '0%', ease: Power3.easeOut }),
                TweenMax.to(this.logoText, .3, { x: '0%', ease: Power3.easeOut }),
                TweenMax.to(this.burgerClose, .3, { x: '0%', ease: Power3.easeOut }),
            ]));
        } else if (this.props.isHomepage) { //header contact link on Large Homepage
            var currentSlide = Math.ceil( (this.getInitialScroll() - 10 ) / $window.height());
            console.log('closeContact with slide', currentSlide);
            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline, true) })
            .add(_.filter([
                TweenMax.to(pieces.left, .3, { x: '-100%', ease: Power3.easeIn }),
                TweenMax.to(pieces.right, .3, { x: '105%', ease: Power3.easeIn }),

                TweenMax.to(this.homeImage[currentSlide], .6, { opacity: 1, ease: Power3.easeInOut }),

                TweenMax.to(this.links, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                TweenMax.to(this.logoText, .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                TweenMax.to(this.homeLeft[currentSlide], .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                TweenMax.to(this.homeRight[currentSlide], .3, { x: '0%', delay: .3, ease: Power3.easeOut }),
                TweenMax.to(this.homeBottom[currentSlide], .3, { y: '0%', delay: .3, ease: Power3.easeOut }),
            ]));

        } else { //header contact link on Large Generic page when scroll = 0
            let timeline = new TimelineLite({ onComplete: onComplete.bind(this, timeline, true) })
            .add(_.filter([
                TweenMax.to(pieces.left, .3, { x: '-100%', ease: Power3.easeIn }),
                TweenMax.to(pieces.right, .3, { x: '105%', ease: Power3.easeIn }),
            ]))
            .add(_.filter([
                TweenMax.to(this.header, .6, { height: this.initialHeight, ease: Power3.easeOut }),
            ]))
            .add((() => {
                this.article.removeClass('fix-header');
            }).bind(this))
            .add(_.filter([
                TweenMax.to(this.links, .3, { x: '0%', ease: Power3.easeOut }),
                TweenMax.to(this.logoText, .3, { x: '0%', ease: Power3.easeOut }),
                TweenMax.to(this.headerText, .3, { x: '0%', ease: Power3.easeOut }),
                TweenMax.to(this.headerImage, .3, { scale: 1, opacity: 1, ease: Power3.easeOut }),
            ]));
        }

        return false;

        function onComplete(timeline, clearScroll) {
            timeline = null;
            this.inProgress = false;
            this.article.removeClass('contact-open');
            if (clearScroll) {
                TweenMax.set(this.header, { clearProps: 'height' });
                $.scrollLock(false);
                setTimeout(this.props.enableScenes, 100);
                this.setInitialScroll(undefined);
            }
        }
    }
}

Header.propTypes = {
    isHomepage: PropTypes.bool,
    title: PropTypes.string,
};

export default Header;
