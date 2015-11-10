import cssLoader from 'modules/defer-css';
cssLoader();

import {default as markdown} from 'modules/markdown';

const div = document.createElement('div');
div.innerHTML = window._commits
  .sort((a, b) =>
    [a, b].map(x => x.commit.committer.date)
      .map(x => new Date(x).getTime())
      .reduce((a, b) => a - b))
  .map(c => Object.assign(c,
    {
      markdown: c.commit.message.split('\n').slice(2).join('\n')
    }))
  .map(c => Object.assign(c,
    {
      html: markdown.toHTML(c.markdown)
    }))
  .map(c => c.html);
document.body.appendChild(div);
