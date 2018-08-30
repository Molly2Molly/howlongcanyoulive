const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
}

const crashReporter = store => next => action => {
    try {
        return next(action);
    } catch(err) {
        console.error('Caught an exception!', err);
        Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        });
        throw err;
    }
}

const timeoutScheduler = store => next => action => {
    if(!action.meta || !action.meta.delay) {
        return next(action);
    }
    const timeoutId = setTimeout(()=>next(action), action.meta.dalay);
    return function cancel() {
        clearTimeout(timeoutId);
    }
}

const rafScheduler = store => next => {
    const queuedActions = [];
    let frame = null;
    function loop() {
        frame = null;
        try {
            if(queuedActions.length) {
                next(queuedActions.shift())
            }
        } finally {
            maybeRaf();
        }
    }
    function maybeRaf() {
        if(queuedActions.length && !frame) {
            frame = requestAnimationFrame(loop);
        }
    }
    return action => {
        if(!action.meta || !action.meta.raf) {
            return next(action);
        }
        queuedActions.push(action);
        maybeRaf();
        return function cancel() {
            queuedActions = queuedActions.filter(a => a !== action);
        }
    }
}

const vanillaPromise = store => next => action => {
    if(typeof action.then !== 'function') {
        return next(action);
    }
    return Promise.resolve(action).then(store.dispatch);
}

const readyStatePromise = store => next => action => {
    if(!action.promise) {
        return next(action);
    }
    function makeAction(ready, data) {
        const newAction = Object.assign({}, action, {ready}, data);
        delete newAction.promise;
        return newAction;
    }
    next(makeAction(false));
    return action.promise.then(result => next(makeAction(true, {result})), error => next(makeAction(true, {error})))
}

const thunk = store => next => action => {
    typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);
}