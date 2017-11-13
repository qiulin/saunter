(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['stateman'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('stateman'));
    } else {
        // Browser globals (root is window)
        root.saunter = factory(root.StateMan);
    }
}(this, function (StateMan) {

    var _ = StateMan.util;


    // get all state match the pattern
    function getMatchStates(stateman, pattern) {
        var current = stateman;
        var allStates = [];

        var currentStates = current._states;

        for (var i in currentStates) {
            var state = currentStates[i];
            if (pattern.test(state.stateName)) allStates.push(state);
            if (state._states) allStates = allStates.concat(getMatchStates(state, pattern))
        }
        return allStates
    }

    var saunter = function (option) {
        option = option || {};
        var stateman = option.stateman || new StateMan(option);
        var preState = stateman.state;
        var BaseComponent = option.Component;
        var globalView = option.view || document.body;

        var filters = {
            encode: function (value, param) {
                return stateman.history.prefix + (stateman.encode(value, param || {}) || "");
            }
        }

        stateman.state = function (name, Component, config) {
            if (typeof config === "string") {
                config = {url: config};
            }

            config = config || {};

            // Use global option.rebuild if config.rebuild is not defined.
            if (config.rebuild === undefined) config.rebuild = option.rebuild;

            if (!Component) return preState.call(stateman, name);

            if (BaseComponent) {
                // 1. regular template or parsed ast
                if (typeof Component === "string" || Array.isArray(Component)) {
                    Component = san.inherits(BaseComponent);
                    Component.prototype.template = Component;
                }
                // 2. it an Object, but need regularify
                if (typeof Component === "object") {
                    Component = san.inherits(Component);
                }
            }

            // 3. duck check is a Regular Component

            /*
            if (!Component.filter("encode")) {
                Component.filter(filters);
            }
            */
            var state = {
                component: null,

                // @TODO:
                canUpdate: function (option) {

                    var canUpdate = this.component && this.component.canUpdate;

                    if (canUpdate) return this.component.canUpdate(option);
                },


                canLeave: function (option) {


                    var canLeave = this.component && this.component.canLeave;

                    if (canLeave) return this.component.canLeave(option);

                },

                canEnter: function (option) {
                    var data = {param: option.param},
                        component = this.component,
                        // if component is not exist or required to be rebuilded when entering.
                        noComponent = !component,
                        view;

                    if (noComponent) {

                        component = this.component = new Component({
                            data: data,

                            state: stateman,

                            stateName: name,

                            /**
                             * notify other module
                             * @param  {String} stateName module's stateName
                             *         you can pass wildcard(*) for
                             *
                             * @param  {Whatever} param   event param
                             * @return {Component} this
                             */
                            notify: function (stateName, type, param) {

                                var pattern, eventObj, state;

                                if (!stateName) return;

                                if (~stateName.indexOf('*')) {

                                    pattern = new RegExp(
                                        stateName
                                            .replace('.', '\\.')
                                            .replace(/\*\*|\*/, function (cap) {
                                                if (cap === '**') return '.*';
                                                else return '[^.]*';
                                            })
                                    );

                                    getMatchStates.forEach(function (state) {
                                        if (state.component) state.component.fire(type, {
                                            param: param,
                                            from: name,
                                            to: state.stateName
                                        })
                                    })

                                } else {
                                    state = stateman.state(stateName);
                                    if (!state || !state.component) return
                                    state.component.fire(type, {
                                        param: param,
                                        from: name,
                                        to: stateName
                                    })
                                }

                            }
                        });
                    }
                    var canEnter = this.component && this.component.canEnter;

                    if (canEnter) return this.component.canEnter(option);
                },

                enter: function (option) {


                    var data = {param: option.param};
                    var component = this.component;
                    var parent = this.parent, view;

                    if (!component) return;

                    // FIXME 如何把数据合并到data中
                    // _.extend(component.data, data, true);
                    var vmData = component.data.get();
                    _.extend(vmData, data);

                    if (parent.component) {
                        view = parent.component.el.getElementsByTagName('router-view')[0];
                        if (!view) throw this.parent.name + " should have a element with [router-view]";
                    } else {
                        view = globalView;
                    }

                    component.attach(view);

                    var result = component.enter && component.enter(option);

                    return result;
                },
                leave: function (option) {
                    var component = this.component;
                    if (!component) return;

                    component.leave && component.leave(option);
                    this.component = null;
                    return component.dispose(true);
                },
                update: function (option) {
                    var component = this.component;
                    if (!component) return;
                    component.update && component.update(option);

                }
            }

            _.extend(state, config || {});

            preState.call(stateman, name, state);


            return this;
        }
        return stateman;
    }

    saunter.StateMan = StateMan;

    return saunter;

}));
