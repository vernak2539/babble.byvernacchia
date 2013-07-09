require 'cgi'
require 'open-uri'

# Require the ActiveSupport::Cache module
require 'active_support/cache'

module Fiftyfive
	module Liquid
		class GistTag < ::Liquid::Tag
			def initialize(tag_name, gist_ref, tokens)
				@gist_ref = gist_ref.strip
				@gist_id, @filename = @gist_ref.split('/')
				super
			end
			
			# A simple file-based cache in ./_tmp shared by all GistTag instances
			def cache
				@@cache ||= ActiveSupport::Cache::FileStore.new("_tmp/gist")
			end
			
			# Return from cache if possible; otherwise fetch and add it to cache
			def fetch_gist(raw_gist_uri)
				cache.fetch(raw_gist_uri) do
					open(raw_gist_uri).read.chomp
				end
			end
		
			def render(context)
				raw_uri = "https://gist.github.com/raw/#{@gist_id}/#{@filename}"
				script_uri = "https://gist.github.com/#{@gist_id}.js?file=#{@filename}"

				<<MARKUP.strip
<div id="gist-#{@gist_ref.gsub(/[^a-z0-9]/i,'-')}">
<script src="#{script_uri}"></script>
<noscript>
<pre>#{CGI.escapeHTML(fetch_gist(raw_uri))}</pre>
</noscript>
</div>
MARKUP
			end
		end
	end
end

Liquid::Template.register_tag('gist', Fiftyfive::Liquid::GistTag)