const path = require('path');

class Bookmarkify {
    static defaults = {
        output: 'bookmark.js',
    };

    constructor(options = {}) {
        this.options = {
            ...Bookmarkify.defaults,
            ...options
        };
    }

    apply(compiler) {
        const { webpack } = compiler;
        const { Compilation } = webpack;
        const { RawSource } = webpack.sources;

        compiler.hooks.thisCompilation.tap(Bookmarkify, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: Bookmarkify,
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    Object.keys(assets).map((name) => {
                        if (path.extname(name).substr(1) == 'js') {
                            const bookmarklet = `javascript: ${encodeURIComponent(assets[name])}`;
                            compilation.emitAsset(
                                this.options.output,
                                new RawSource(bookmarklet)
                            );
                        }
                    })
                }
            );
        });
    }
}

module.exports = { Bookmarkify };
