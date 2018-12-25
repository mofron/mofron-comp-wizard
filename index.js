/**
 * @file   mofron-comp-wizard/index.js
 * @brief  wizard component for mofron
 * @author simpart
 */
const mf = require('mofron');
const Horiz = require('mofron-layout-horizon');

mf.comp.Wizard = class extends mf.Component {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('Wizard');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @note private method
     */
    initDomConts () {
        try {
            super.initDomConts();
            
            /* index wrapper */
            this.indexWrap().execOption({
                layout : [ new Horiz() ]
            });
            this.addChild(this.indexWrap());
            
            /* contents */
            let conts = new mf.Component();
            this.addChild(conts);
            this.target(conts.target());
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeRender () {
        try {
            super.beforeRender();
            if (null === this.index()) {
                this.index(0);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * wizard contents getter/setter
     *
     * @param p1 (Component) wizard contents
     * @param p1 (undefined) call as getter
     * @return (Component) wizard contents
     */
    contents (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.child();
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let cidx in prm) {
                    this.addConts(prm[cidx]);
                }
                return;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add wizard contents
     */
    addConts (prm) {
        try {
            prm.execOption({ visible : false });
            this.addChild(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * index wrapper
     * @note private method
     */
    indexWrap (prm) {
        try { return this.innerComp('indexWrap', prm, mf.Component); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * index component setter/getter
     *
     * @param p1 (Component) index component
     * @param p1 (array) array of index component
     * @param p1 (undefined) call as getter
     * @return (array) index component
     */
    indexComp (prm) {
        try { return this.indexWrap().child(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * wizard index setter/getter
     *
     * @param p1 (number) wizard index
     * @param p1 (undefined) call as getter
     * @return (number) wizard index
     */
    index (prm) {
        try {
            let idx = this.member('index');
            if (undefined === prm) {
                /* getter */
                return idx;
            }
            /* setter */
            if (prm === idx) {
                return;
            }
            this.member('index', 'number', prm);
            let evt = this.indexEvent();
            for (let eidx in evt) {
                evt[eidx][0](this, prm, evt[eidx][1]);
            }
            
            /* switch contents */
            let cont = this.contents();
            for (let cidx in cont) {
                cont[cidx].visible(
                    (cidx == prm) ? true : false
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * next contents
     */
    next () {
        try {
            if (this.contents().length-1 <= this.index()) {
                return;
            }
            this.index(this.index()+1);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * previous contetns
     */
    prev () {
        try {
            if (0 === this.index()) {
                return;
            }
            this.index(this.index()-1);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * index event setter/getter
     *
     * @param p1 (function) event function
     * @param p1 (undefined) call as getter
     * @param p2 (mixed) event parameter
     * @return (array) index event [function, parameter]
     */
    indexEvent (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return (undefined === this.m_idxevt) ? [] : this.m_idxevt;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_idxevt) {
                this.m_idxevt = [];
            }
            this.m_idxevt.push([fnc, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Wizard;
/* end of file */
