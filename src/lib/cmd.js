/**
 * @author heart
 * @description 命令行
 * @Date 2022-09-16
 */
import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
export function parseCmdParams() {
  const optionDefinitions = [
    { name: 'pMax', type: Number },
    { name: 'pMin', type: Number },
    { name: 'cMax', type: Number },
    { name: 'cMin', type: Number },
    { name: 'articleLMax', type: Number },
    { name: 'articleLMin', type: Number },
    { name: 'sectionLMin', type: Number },
    { name: 'sectionLMax', type: Number },
  ]
  return commandLineArgs(optionDefinitions)
}

export function showUsage() {
  const sections = [
    {
      header: '词条生成器',
      content: '生成词条段落 便于调试',
    },
    {
      header: 'help',
      optionList: [
        {
          name: 'articleLMax',
          typeLabel: '{underline string}',
          description: '文章最大字数',
        },
        {
          name: 'articleLMin',
          typeLabel: '{underline string}',
          description: '文章最少字数',
        },
        {
          name: 'sectionLMax',
          typeLabel: '{underline string}',
          description: '文章段落最大字数',
        },
        {
          name: 'sectionLMin',
          typeLabel: '{underline string}',
          description: '文章段落最小字数',
        },
      ],
    },
  ]
  const list = process.argv
  const index = list.findIndex((val) => val === '--help')
  if (index > -1) {
    const usage = commandLineUsage(sections)
    console.log(usage)
    process.exit()
  }
}
