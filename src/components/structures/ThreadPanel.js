/*
Copyright 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';

import sdk from '../../index';
import MatrixClientPeg from '../../MatrixClientPeg';
import { _t } from '../../languageHandler';

const ThreadPanel = React.createClass({
    displayName: 'ThreadPanel',

    propTypes: {
        roomId: PropTypes.string.isRequired,
        mxEvent: PropTypes.object.isRequired,
    },

    getInitialState: function() {
        return {
            timelineSet: null,
        };
    },

    getThreadId() {
        return this.props.mxEvent.getContent().thread_id;
    },

    componentWillMount: function() {
        const room = MatrixClientPeg.get().getRoom(this.props.roomId);
        const timelineSet = room.getThreadTimelineSet(this.getThreadId());
        this.setState({
            timelineSet: timelineSet,
        });
    },

    render: function() {
        const TimelinePanel = sdk.getComponent("structures.TimelinePanel");
        const MessageTimestamp = sdk.getComponent("messages.MessageTimestamp");
        return (
            <div className="mx_ThreadPanel">
                <p>{_t("Received at")} <MessageTimestamp ts={this.props.mxEvent.getTs()} /> ({this.getThreadId()})</p>
                <TimelinePanel key={`thread_${this.props.roomId}/${this.getThreadId()}`}
                    className="mx_ThreadPanel_timeline"
                    timelineSet={this.state.timelineSet}
                />
            </div>
        );
    },
});

module.exports = ThreadPanel;
