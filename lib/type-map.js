module.exports = {
  /**
   * 有序列表
   */
  orderList: {
    reg: /^(\d\s*\.\s*)/, // 正则匹配表达式
  },
  /**
   * title
   */
  title: {
    reg: /^(\s*\#+)/
  },
  /**
   * 被标识是英文单词或片段
   */
  word: {
    reg: /\b(\w|\+|\-|\*|\s|\%|\/)+\b/g
  }
}