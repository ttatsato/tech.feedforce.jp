#!/usr/bin/env ruby

require 'slack-notifier'
require 'yaml'

class Ranking
  # Getting formatted ranking data
  #
  # @return [String]
  def formatted_data
    result = ''

    raw_data.sort_by(&:last).reverse.each do |k,v|
      result += sprintf("%4d %s\n", v, k)
    end

    result
  end

  private

  # Getting ranking raw data which is unsorted
  #
  # @return [Hash] {"author1" => 10, "author2" => 5, "author3" => 8,...}
  def raw_data
    result = {}

    articles.each do |article|
      match = File.readlines(article).grep(/^authors:/).first.chomp.split
      match.shift

      match.each do |author|
        next unless target_authors.include?(author)

        if result[author]
          result[author] += 1
        else
          result[author] = 1
        end
      end
    end

    result
  end

  # Getting article files
  def articles
    @articles ||= Dir.glob(File.join(__dir__, '../source/posts/*.md'))
  end

  # Getting target authors
  def target_authors
    @target_authors ||= yaml.map { |y| y['id'] unless y['resignation'] }
  end

  # Getting yaml data
  def yaml
    @yaml ||= YAML.load(IO.read(File.join(__dir__, '../data/author.yml')))
  end
end

# 前回の commit との差分に Markdown ファイルがある時だけ、
# このスクリプトを実行します
if `git diff --name-only --diff-filter=ACMR HEAD~1`.split.grep(/.+\.md$/).empty?
  exit 0
end

Slack::Notifier.new(ENV['SLACK_WEBHOOK_URL']).ping(
  Ranking.new.formatted_data
)
