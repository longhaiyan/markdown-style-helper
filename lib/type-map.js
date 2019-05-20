module.exports = {
  noCheckType: [
    /**
     * 横线
     * 三种形式：
     * ---
     * ***
     * ___
     */
    {
      type: 'line',
      reg: /(^\s*\-(\-+)\-$)|(^\s*\*(\*+)\*$)|(^\s*\_(\_+)\_$)/
    },
    /**
     * image
     */
    {
      type: 'image',
      reg: /\!\[[^\]]+\]\([^\)]+\)/
    },
    /**
     * link
     */
    {
      type: 'link',
      reg: /\[[^\]]+\]\([^\)]+\)/
    },
  ],
  checkType: [
    /**
     * 有序列表
     */
    {
      type: 'ol',
      reg: /^\s*\d\s*\.\s*/, // 正则匹配表达式
    },
    /**
     * 无序列表
     * - + *
     */
    {
      type: 'ul',
      reg: /^(\s*(\*|\-|\+)\s*)/
    },
    /**
     * title
     */
    {
      type: 'title',
      reg: /^(\s*\#+)/
    },
    /**
     * 加粗
     */
    {
      type: 'strong',
      reg: /(\_{2}[^\_]+\_{2})|(\*{2}[^\*]+\*{2})/
    },
    /**
     * 倾斜
     * 两种：
     * *This is italic text*
     * _This is italic text_
     */
    {
      type: 'italic',
      reg: /(^\s*\*[^\*]+\*$)|(^\s*\_[^\_]+\_$)/
    },
    /**
     * line-through
     * ~~Strikethrough~~
     */
    {
      type: 'lineThrough',
      reg: /^\s*\~{2}[^\~]+\~{2}$/
    },
    /**
     * 引用
     */
    {
      type: 'blockquote',
      reg: /^\s*\>/
    },
  ],
  goOnCheckType: [
    /**
     * 表格
     * reg1：普通 table 正则
     * reg2：表格展示规则的正则
     */
    {
      type: 'table',
      reg: [/\|*([^\|,\n]+\|)/g, /\|*(\s*\:*\-+\:*\s*\|)+/g],
    },
    /**
     * 代码块
     */
    {
      type: 'code',
      reg: /^\s*(\`){3}/
    },
  ],
  /**
   * 被标识是英文单词或片段
   */
  word: {
    reg: /(\.|\w|\+|\-|\*|\s|\%|\/)+/g
  }
}