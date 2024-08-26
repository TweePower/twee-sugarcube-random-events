(function () {
    'use strict';

    Macro.add('AddCodeBlock', {
        tags : null,
        handler: function () {
            let showHideLinkText = this.args[0] ?? null;
            let language = this.args[1] ?? 'xml';
            let code = this.payload[0].contents.split('\n');
            while (code.length > 0) {
                if (code[0].trim() === '') {
                    code.shift();
                } else if (code[code.length - 1].trim() === '') {
                    code.pop();
                } else {
                    break;
                }
            } // remove first and last empty lines

            let minSpace = Math.min(...code.filter((line) => line.trim() !== '').map((line) => line.match(/^( +)?/)[0].length));
            code = code.map((line) => line.slice(minSpace)).join('\n'); // remove indentation

            let $divWrapper = $('<div>');
            let $pre = $('<pre>', { class: 'code-block' });
            let $code = $('<code>').appendTo($pre);

            $code.html(
                hljs.highlight(
                    code,
                    { language: language }
                ).value
            );

            if (showHideLinkText !== null) {
                $pre.hide();
                let $toggleButton = $('<a>', {
                    class: 'toggle-code-block-link',
                    html: showHideLinkText
                }).on('click',  function() {
                    $(this).parent().find('pre.code-block').toggle();
                });

                $divWrapper.append($toggleButton);
            }

            $divWrapper.append($pre);

            $(this.output).append($divWrapper);
        }
    });

    Macro.add('PrintCode', {
        handler: function () {
            if (this.args.length === 0) {
				return this.error('No code specified');
			}

            let code = this.args[0];

            let $divWrapper = $('<div>');
            let $pre = $('<pre>', {
                class: 'code-block',
            });
            let $code = $('<code>').appendTo($pre);
            $code.html(hljs.highlight(
                code,
                { language: 'xml' }
              ).value);

            $divWrapper
                .append($pre);

            $(this.output).append($divWrapper);
        }
    });

    Macro.add('PassageCode', {
        handler: function () {
            if (this.args.length === 0) {
				return this.error('No passage name specified');
			}

            let passageName;
			if (typeof this.args[0] === 'object') {
				passageName = this.args[0].link;
			} else {
				passageName = this.args[0];
			}

            let $divWrapper = $('<div>');
            let $pre = $('<pre>', {
                class: 'code-block',
                style: 'display: none'
            });
            let $code = $('<code>').appendTo($pre);
            $code.html(hljs.highlight(
                Story.get(passageName).text.trim(),
                { language: 'xml' }
              ).value);

            let $toggleButton = $('<button>', {
                html: 'show/hide passage code'
            }).on('click',  function() {
                $(this).parent().find('pre.code-block').toggle();
            });

            $divWrapper
                .append($toggleButton)
                .append($pre);

            $(this.output).append($divWrapper);
        }
    });
}());
